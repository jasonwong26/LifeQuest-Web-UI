import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import DataTable from "../../../components/layout/DataTable";

import { DataStatus } from "../../../store/shared";
import { Quest } from "../../../store/admin/quests";

interface Props {
  status: DataStatus,
  data: Quest[]
}

export const List: React.SFC<Props> = ({ status, data }) => {
  const loading = status === DataStatus.LOADING;

  return (
    <React.Fragment>
      <div className="text-right">
        <LinkContainer to="./quests/create">
          <a
            href="./quests/create"
            className="btn btn-success"
            title="Create New" >
            Create New
          </a>
        </LinkContainer>
      </div>
      <div className="gutter-top">
        <DataTable columns={["Quest"]}>
          {loading && data.length === 0 && (
            <tr>
              <td>
                <LoadingBar loading={loading} />
              </td>
            </tr>
          )}
          {!loading && data.map(scene => (
            <tr key={scene.id}>
              <td>
                <LinkContainer to={`./quests/${scene.id}`}>
                  <div>
                    <a href={`./quests/${scene.id}`}>
                      <h4>{scene.name}</h4>
                    </a>
                    <span>{scene.description}</span>
                  </div>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </React.Fragment>
  );
};
