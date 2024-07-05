import Reports from "./Reports";

export default function Home(props) {
  const {showAlert} = props
  return (
    <div>
      <Reports showAlert={showAlert} />
    </div>
  );  
}
