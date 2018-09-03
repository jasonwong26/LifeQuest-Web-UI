import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import Page from "../../../components/layout/Page";
import LoadingBar from "../../../components/layout/LoadingBar";
import DataTable from "../../../components/layout/DataTable";

import { ApplicationState, ConnectedReduxProps } from "../../../store/root";
import { Character, fetchRequest } from "../../../store/admin/characters";


// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Character[]
  errors: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

class CharactersIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    // always get latest data from server
    this.props.fetchRequest();
  }

  public render() {
    const { loading } = this.props;

    return (
      <Page>
        <LoadingBar loading={loading} />
        {this.renderData()}
      </Page>
    );
  }

  private renderData() {
    const { loading, data } = this.props;

    return (
      <DataTable columns={["Character"]} widths={["auto", "", ""]}>
        {loading &&
          data.length === 0 && (
            <tr>
              <td colSpan={1}>Loading...</td>
            </tr>
          )}
        {!loading && data.map(character => (
          <tr key={character.id}>
            <td>
              <LinkContainer to={`./characters/${character.id}`}>
                <div>
                  <a href={`./characters/${character.id}`}>
                    <h4>{character.name}</h4>
                  </a>
                  <span>{character.description}</span>
                </div>
              </LinkContainer>
            </td>
          </tr>
        ))}
      </DataTable>
    );
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ characters }: ApplicationState) => ({
  loading: characters.loading,
  errors: characters.errors,
  data: characters.data
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersIndexPage);
