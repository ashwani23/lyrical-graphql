import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LyricList extends Component {

    onLike(lyricId, likes) {
        this.props.mutate({
            variables: {
                id: lyricId
            },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: lyricId,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        });
    }

    renderLyrics() {
        return this.props.lyrics.map(lyric => {
            return (
                <li
                    key={lyric.id}
                    className="collection-item pointer-cursor"
                >
                    {lyric.content}
                    <div className="vote-box right">
                        <i
                            className="material-icons"
                            onClick={(event) => {
                                event.stopPropagation();
                                this.onLike(lyric.id, lyric.likes)
                            }}
                        >
                            thumb_up
                        </i>
                        {lyric.likes}
                    </div>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <ul className="collection">
                    {this.renderLyrics()}
                </ul>
            </div>
        )
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID){
        likeLyric(id: $id) {
            id,
            likes
        }
    }
`;

export default graphql(mutation)(LyricList);