import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import PhotoCard from "./PhotoCard";
import AddPhoto from "./AddPhoto";
import { db, snapshotToArray } from "./firebase";

export default function Photos(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(props.user.uid)
      .collection("albums")
      .doc(props.match.params.albumID)
      .collection("photos")
      .onSnapshot(snapshot => {
        const updatedPhotos = snapshotToArray(snapshot);
        setPhotos(updatedPhotos);
      });

    return unsubscribe;
  }, [props]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingTop: 10
      }}
    >
      {photos.map(p => {
        return <PhotoCard photo={p} />;
      })}

      <div>
        <Button
          color="secondary"
          variant="contained"
          style={{ marginTop: 10 }}
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          {" "}
          Add Photo{" "}
        </Button>
      </div>
      <AddPhoto
        albumID={props.match.params.albumID}
        user={props.user}
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
