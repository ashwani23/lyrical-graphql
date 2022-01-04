import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";
import { Link } from "react-router"
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/">Back</Link>
                <h4>{this.props.data.song.title}</h4>
                <LyricList lyrics={this.props.data.song.lyrics}/>
                <LyricCreate songId={this.props.params.id} />
            </div>
        )
    }
}

export default graphql(fetchSong, {
    options: props => ({ variables: { id: props.params.id } })
})(SongDetail);