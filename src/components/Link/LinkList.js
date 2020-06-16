import React, { useContext, useEffect } from "react";
import FirebaseContext from "../../firebase/context";

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);

  function getLinks() {
    firebase.db.collection("links").onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log({ links });
  }

  useEffect(() => {
    getLinks();
  }, []);
  return <div>LinkList</div>;
}

export default LinkList;
