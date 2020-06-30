import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";
import { LINKS_PER_PAGE } from "../../utils";

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [cursor, setCursor] = useState(null);
  const isNewPage = props.location.pathname.includes("new");
  const isTopPage = props.location.pathname.includes("top");
  const page = Number(props.match.params.page);

  //----fetching data from firestore database----
  // function getLinks() {
  //   firebase.db.collection("links").onSnapshot(handleSnapshot);
  // }

  //fetching data with ordering
  function getLinks() {
    const hasCursor = Boolean(cursor);
    if (isTopPage) {
      return firebase.db
        .collection("links")
        .orderBy("voteCount", "desc")
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else if (page === 1) {
      return firebase.db
        .collection("links")
        .orderBy("created", "desc")
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else if (hasCursor) {
      return firebase.db
        .collection("links")
        .orderBy("created", "desc")
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    }
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    const lastLink = links[links.lenght - 1];
    setLinks(links);
    setCursor(lastLink);
  }

  useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isTopPage, page]);

  function visitPreviousPage() {
    if (page > 1) {
      props.history.push(`/new/${page - 1}`);
    }
  }

  function visitNextPage() {
    if (page <= links.length / LINKS_PER_PAGE) {
      props.history.push(`/new/${page + 1}`);
    }
  }

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem
          key={link.id}
          showCount={true}
          link={link}
          index={index + 1}
        />
      ))}
      {isNewPage && (
        <div className="pagination">
          <div className="pointer mr2" onClick={visitPreviousPage}>
            Previous
          </div>
          <div className="pointer" onClick={visitNextPage}>
            Next
          </div>
        </div>
      )}
    </div>
  );
}

export default LinkList;
