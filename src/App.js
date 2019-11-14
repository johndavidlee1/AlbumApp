import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, Route } from "react-router-dom";
import { auth, db, snapshotToArray } from "./firebase";
import Photos from "./Photos";
import AddAlbum from "./AddAlbum";

export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [albums, setAlbums] = useState([
    { id: 0, title: "Cities" },
    { id: 1, title: "Nature" }
  ]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });
    return unsubscribe;
  }, [props.history]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("albums")
        .onSnapshot(snapshot => {
          const updatedAlbums = snapshotToArray(snapshot);
          setAlbums(updatedAlbums);
        });
    }
  }, [user]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  if (!user) {
    return <div />;
  }
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1, marginLeft: "30px" }}
          >
            My App
          </Typography>
          <Typography color="inherit" style={{ marginRight: "30px" }}>
            Hi! {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            {" "}
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawer_open}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <List component="nav" aria-label="secondary mailbox folders">
          {albums.map(a => {
            return (
              <ListItem
                button
                to={"/app/album/" + a.id + "/"}
                component={Link}
                onClick={() => {
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={a.name} />
              </ListItem>
            );
          })}
          <ListItem
            button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <ListItemText primary="Create New Album" />
          </ListItem>
        </List>
      </Drawer>
      <Route
        path="/app/album/:albumID/"
        render={routeProps => {
          return (
            <Photos
              user={user}
              match={routeProps.match}
              location={routeProps.location}
              history={routeProps.history}
            />
          );
        }}
      />

      <AddAlbum
        user={user}
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
