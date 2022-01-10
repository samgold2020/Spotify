import { Colors } from "../../colors";

const styles = {
  // buttonPrimary: (primary) => ({
  //   backgroundColor: primary === "primary" ? "green" : "white",
  //   borderColor: "green",
  //   color: primary === "primary" ? "white" : "green",
  //   fontSize: 24,
  //   fontWeight: "400",
  // }),
  buttonPrimary: {
    backgroundColor: "green",
    borderColor: "green",
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    width: "18rem",
    height: "5rem",
    borderRadius: "15px",
    paddingRight: '10px',
  },
  secondaryButton: {
    backgroundColor: "white",
    borderColor: "green",
    color: Colors.spotifyGreen,
    fontSize: '1.5rem',
    fontWeight: "700",
    margin: '1rem'

  },
};

export default styles;
