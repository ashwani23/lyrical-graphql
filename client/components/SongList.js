import gql from "graphql-tag";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link, hashHistory } from 'react-router';
import fetchSongs from "../queries/fetchSongs";

class SongList extends Component {

    onSongDelete(songId) {
        this.props.mutate({
            variables: { id: songId }
        }).then(() => this.props.data.refetch())
    }

    renderSongs() {
        return this.props.data.songs.map(song => {
            return (
                <li
                    key={song.id}
                    className="collection-item pointer-cursor"
                    onClick={() => hashHistory.push(`/songs/${song.id}`)}
                >
                    {song.title}
                    <i
                        className="material-icons right"
                        onClick={(event) => {
                            event.stopPropagation()
                            this.onSongDelete(song.id)
                        }}
                    >
                        delete
                    </i>
                </li>
            );
        });
    }

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <ul className="collection">{this.renderSongs()}</ul>
                <Link
                    to="/songs/create"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID){
        deleteSong(id: $id) {
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(fetchSongs)(SongList)
);