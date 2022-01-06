import globalStyle from "./globalStyle";

const homeStyle = {
    ...globalStyle,
    root: {
      flexGrow: 1,
    },
    card: {
        minHeight: 400,
        textAlign: "center",
        width: "100%",
        marginTop: "50px",
        background: "#cfd8dc",
        position: "absoute",
        opacity: 0.99
      },
      cardC: {
        minHeight: 300,
        textAlign: "center",
        width: "100%",
        marginTop: "50px",
        background: "#cfd8dc",
        position: "absoute",
        opacity: 0.99
      },
      title: {
        color: "#1976d2",
        fontFamily: "Century Gothic",
        textShadow: "1px 1px 2px black",
        fontWeight: 550,
        marginTop: "100px"
      },
      titleC: {
        fontFamily: "Century Gothic",
        textShadow: "1px 1px 2px black",
        fontWeight: 550,
      },
      text: {
        fontFamily: "Century Gothic",
        textShadow: "1px 0.5px 2px black",
        fontWeight: 550,
      },
      
  };
  
  export default homeStyle;