import { Colors } from "../../colors";

const styles = {
  buttonPrimary: (primary) => ({
    backgroundColor: primary === "primary" ? "green" : "white",
    borderColor: "green",
    color: primary === "primary" ? "white" : "green",
    fontSize: 24,
    fontWeight: "400",
  }),
};

export default styles;
