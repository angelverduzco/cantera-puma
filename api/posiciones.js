export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const mainUrl = "https://www.ligamx.net/cancha/clasificacion/1";
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

  try {
    const mainResponse = await fetch(mainUrl, {
      headers: {
        "User-Agent": userAgent,
      },
    });

    if (!mainResponse.ok) {
      throw new Error(
        `Error al consultar la página de clasificación principal: ${mainResponse.status}`,
      );
    }

    const mainHtml = await mainResponse.text();

    // Extraer el hash dinámico para la tabla general
    const pattern =
      /\/cancha\/tablas\/tablaGeneralClasificacion\/sp\/([a-zA-Z0-9]+)/;
    const match = mainHtml.match(pattern);

    if (!match) {
      throw new Error(
        "No se pudo encontrar el enlace dinámico de la tabla en el HTML",
      );
    }

    const hash = match[1];
    const subPageUrl = `https://www.ligamx.net/cancha/tablas/tablaGeneralClasificacion/sp/${hash}`;

    const subResponse = await fetch(subPageUrl, {
      headers: {
        "User-Agent": userAgent,
      },
    });

    if (!subResponse.ok) {
      throw new Error(
        `Error al consultar la subpágina de la tabla: ${subResponse.status}`,
      );
    }

    const html = await subResponse.text();

    // Intentar extraer la temporada del script window.parametros en el HTML
    const torneoMatch = html.match(/"nombreTorneo"\s*:\s*"([^"]+)"/i);
    const tempMatch = html.match(/"nombreTemporada"\s*:\s*"([^"]+)"/i);
    const strSeason =
      torneoMatch && tempMatch ? `${torneoMatch[1]} ${tempMatch[1]}` : "Actual";

    // Procesar las filas <tr> de la tabla
    const trs = html.split(/<tr[^>]*>/i);
    const tableData = [];

    for (let i = 1; i < trs.length; i++) {
      const tr = trs[i];
      const rowContent = tr.split(/<\/tr>/i)[0];

      // Filtrar filas que no correspondan a clubes de la tabla
      if (
        !rowContent.includes("/club/") ||
        !rowContent.includes("tablenameClub")
      ) {
        continue;
      }

      // Extraer posición (Rank)
      const rankMatch = rowContent.match(/^\s*<td[^>]*>\s*([0-9]+)\s*<\/td>/i);
      const intRank = rankMatch
        ? parseInt(rankMatch[1], 10)
        : tableData.length + 1;

      // Extraer ID y URL del Club
      const clubMatch = rowContent.match(
        /href=["'](?:[^"']*)club\/([0-9]+)\/([^"'\s>]+)["']/i,
      );
      if (!clubMatch) continue;
      const idClub = clubMatch[1];
      const nombreClubUrl = clubMatch[2];

      // Extraer Escudo
      const badgeMatch = rowContent.match(/src=["']([^"']+)["']/i);
      const strBadge = badgeMatch
        ? badgeMatch[1]
        : `https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/Afldos/logos/${idClub}/${idClub}.png`;

      // Extraer Nombre del Equipo
      const nameLinkMatch = rowContent.match(
        /<a[^>]+class=["'][^"']*col-xs-9[^"']*["'][^>]*>([\s\S]*?)<\/a>/i,
      );
      let strTeam = "";
      if (nameLinkMatch) {
        strTeam = nameLinkMatch[1].replace(/<[^>]+>/g, "").trim();
      } else {
        const altMatch = rowContent.match(/alt=["']([^"']+)["']/i);
        strTeam = altMatch ? altMatch[1].trim() : nombreClubUrl;
      }

      // Extraer las celdas con estadísticas
      const cells = [];
      const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
      let cellMatch;
      while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
        cells.push(cellMatch[1]);
      }

      const cleanCells = cells.map((c) => c.replace(/<[^>]+>/g, "").trim());

      // Mapeo de celdas:
      // cleanCells[2] -> JJ (Partidos Jugados)
      // cleanCells[3] -> JG (Ganados)
      // cleanCells[4] -> JE (Empatados)
      // cleanCells[5] -> JP (Perdidos)
      // cleanCells[8] -> Dif (Diferencia de Goles)
      // cleanCells[9] -> Pts (Puntos)
      const intPlayed = parseInt(cleanCells[2], 10) || 0;
      const intWin = parseInt(cleanCells[3], 10) || 0;
      const intDraw = parseInt(cleanCells[4], 10) || 0;
      const intLoss = parseInt(cleanCells[5], 10) || 0;
      const intGoalDifference = parseInt(cleanCells[8], 10) || 0;
      const intPoints = parseInt(cleanCells[9], 10) || 0;

      tableData.push({
        idTeam: nombreClubUrl === "pumas" ? "134201" : String(idClub),
        intRank: String(intRank),
        strTeam,
        strBadge,
        intPlayed: String(intPlayed),
        intWin: String(intWin),
        intDraw: String(intDraw),
        intLoss: String(intLoss),
        intGoalDifference: String(intGoalDifference),
        intPoints: String(intPoints),
        strLeague: "Liga MX",
        strSeason: strSeason,
      });
    }

    res.setHeader(
      "Cache-Control",
      "s-maxage=86400, stale-while-revalidate=43200",
    );

    return res.status(200).json({
      success: true,
      source: "Liga MX (Scraped HTML)",
      data: tableData,
    });
  } catch (error) {
    console.error("Error obteniendo posiciones de Liga MX:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener la tabla de posiciones.",
      details: error.message,
    });
  }
}

// Código para probar localmente con `node api/posiciones.js`
if (
  typeof process !== "undefined" &&
  process.argv &&
  process.argv[1] &&
  process.argv[1].endsWith("posiciones.js")
) {
  console.log("Probando el endpoint de posiciones localmente...");
  const mockReq = { method: "GET" };
  const mockRes = {
    status: (code) => ({
      json: (data) => {
        console.log(`\n=== RESPUESTA (Status: ${code}) ===`);
        console.log(JSON.stringify(data, null, 2));
      },
    }),
    setHeader: (name, value) => {
      console.log(`[Header] ${name}: ${value}`);
    },
  };

  handler(mockReq, mockRes).then(() => process.exit(0));
}
