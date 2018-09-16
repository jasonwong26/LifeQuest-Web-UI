// import * as React from "react";
//
// import { TextInput, TextArea } from "../../../components/forms";
//
// import { Trigger, TriggerType } from "../../../store/admin/cutscenes";
//
// export interface Props {
//   data: Trigger,
//   onChange: (trigger: Trigger) => void,
// }
//
// interface State {
//   data: Trigger,
//   errors: any
// }
//
// type HTMLFormInput = HTMLInputElement | HTMLTextAreaElement;
//
// export class DialogueForm extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//
//     this.state = {
//       data: props.data,
//       errors: {}
//     };
//   }
//
//   public componentWillReceiveProps(nextProps: Props) {
//     this.setState({data: Object.assign({}, nextProps.data)});
//   }
//
//   public render() {
//     const { data, errors } = this.state;
//     const text = data.text.join("\n\n");
//
//     return (
//       <div className="row">
//         <div className="col-sm-10">
//           <TextInput
//             label="Speaker"
//             name="speaker"
//             onChange={this.onChange}
//             value={data.speaker}
//             error={errors.speaker}
//             />
//           {/* placeholder for image dropdown control */}
//           <TextInput
//             label="Image Url"
//             name="url"
//             onChange={this.onChange}
//             value={data.imageUrl}
//             error={errors.imageUrl}
//             />
//           {/* placeholder for dialogue control */}
//           <TextArea
//             label="Text"
//             name="text"
//             onChange={this.onTextChange}
//             value={text}
//             error={errors.text}
//             />
//         </div>
//       </div>
//     );
//   }
//
//   private onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const field = event.target.name;
//     const value = event.target.value;
//
//     const text = value.split("\n\n");
//     const change = { [field]: text };
//
//     this.saveChanges<string[]>(change);
//   }
//
//   private onChange = (event: React.ChangeEvent<HTMLFormInput>) => {
//     const field = event.target.name;
//     const value = event.target.value;
//     const change = { [field]: value };
//
//     this.saveChanges<string>(change);
//   }
//   private saveChanges : <T>(change: { [key: string]: T }) => void = change => {
//     const updated = Object.assign({}, this.state.data, change);
//     this.setState({ data: updated });
//
//     if(this.isValid()) {
//       const index = this.props.index;
//       this.props.onChange(index, updated);
//     }
//   }
//   private isValid = () => {
//     const data = this.state.data;
//     const errors: {[key: string]: string} = {};
//
//     if(!data.speaker || data.speaker.length === 0) {
//       errors.id = "You must specify the speaker for this section of dialogue";
//     }
//
//     if(!data.imageUrl || data.imageUrl.length === 0) {
//       errors.name = "You must specify the image for this section of dialogue";
//     }
//
//     if(!data.text || data.text.length === 0) {
//       errors.description = "You must specify the text for this section of dialogue";
//     }
//
//     this.setState({ errors });
//     return Object.keys(errors).length === 0;
//   }
// }
