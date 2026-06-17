import "./StandingsTable.css";

export default function StandingsTable({ standings }) {
  return (
    <div
      className="table-responsive-wrapper"
      role="region"
      aria-labelledby="table-caption"
      tabIndex="0"
    >
      <table className="standings-table">
        <caption id="table-caption" className="sr-only">
          Posiciones actuales de los equipos en la liga
        </caption>
        <thead>
          <tr>
            <th scope="col" aria-label="Posición" className="col-rank">
              #
            </th>
            <th scope="col" aria-label="Club de Fútbol" className="col-team">
              Club
            </th>
            <th scope="col" aria-label="Puntos" title="Puntos totales">
              Pts
            </th>
            <th
              scope="col"
              aria-label="Partidos Jugados"
              title="Partidos Jugados"
              className="hide-mobile"
            >
              PJ
            </th>
            <th
              scope="col"
              aria-label="Partidos Ganados"
              title="Ganados"
              className="hide-mobile"
            >
              G
            </th>
            <th
              scope="col"
              aria-label="Partidos Empatados"
              title="Empatados"
              className="hide-mobile"
            >
              E
            </th>
            <th
              scope="col"
              aria-label="Partidos Perdidos"
              title="Perdidos"
              className="hide-mobile"
            >
              P
            </th>
            <th
              scope="col"
              aria-label="Diferencia de Goles"
              title="Diferencia de Goles"
            >
              DG
            </th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row) => {
            const isPumas = row.idTeam === "134201";
            const goalDiff = parseInt(row.intGoalDifference, 10);
            return (
              <tr key={row.idTeam} className={isPumas ? "highlight-team" : ""}>
                <td className="col-rank">
                  <strong>{row.intRank}</strong>
                </td>
                <td className="col-team">
                  <div className="team-info">
                    <span className="team-name">
                      {row.strTeam}
                      {isPumas && <span className="sr-only"> (Tu equipo)</span>}
                    </span>
                  </div>
                </td>
                <td className="col-points">
                  <strong>{row.intPoints}</strong>
                </td>
                <td className="hide-mobile">{row.intPlayed}</td>
                <td className="hide-mobile">{row.intWin}</td>
                <td className="hide-mobile">{row.intDraw}</td>
                <td className="hide-mobile">{row.intLoss}</td>
                <td className="col-diff">
                  {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
