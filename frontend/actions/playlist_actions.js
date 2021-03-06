import * as PlaylistAPIUtil from '../util/playlist_api_util';
import * as MusicAPIUtil from '../util/music_api_util';
import { requestData, REQUEST_DATA, receiveSong } from './music_actions';

export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST";
export const RECEIVE_NEW_PLAYLIST = "RECEIVE_NEW_PLAYLIST";
export const PLAY_LIST_FROM_STATE = "PLAY_LIST_FROM_STATE";
export const PLAY_ALBUM_FROM_STATE = "PLAY_ALBUM_FROM_STATE";
export const ADD_SONG_TO_PLAYLIST = "ADD_SONG_TO_PLAYLIST";
export const REMOVE_SONG_FROM_PLAYLIST = "REMOVE_SONG_FROM_PLAYLIST";
export const RECEIVE_DELETED_PLAYLIST = "RECEIVE_DELETED_PLAYLIST";
export const TOGGLE_FOLLOW = "TOGGLE_FOLLOW";
export const RECEIVE_UPDATED_PLAYLIST_IMAGE = "RECEIVE_UPDATED_PLAYLIST_IMAGE";

export const receivePlaylist = playlist => ({
  type: RECEIVE_PLAYLIST,
  playlist
});

export const receiveNewPlaylist = playlist => ({
  type: RECEIVE_NEW_PLAYLIST,
  playlist
});

export const playListFromState = playlist => ({
  type: PLAY_LIST_FROM_STATE,
  tracks: playlist.tracks
});

export const addSongToPlaylist = listing => ({
  type: ADD_SONG_TO_PLAYLIST,
  listing
});

export const removeSongFromPlaylist = listing => ({
  type: REMOVE_SONG_FROM_PLAYLIST,
  listing
});

export const playAlbumFromState = album => ({
  type: PLAY_ALBUM_FROM_STATE,
  tracks: album.tracks
});

export const toggleFollow = playlistFollow => ({
  type: TOGGLE_FOLLOW,
  playlistFollow
});

export const receiveDeletedPlaylistId = playlistId => ({
  type: RECEIVE_DELETED_PLAYLIST,
  playlistId
});

export const receiveUpdatedPlaylistImage = playlist => ({
  type: RECEIVE_UPDATED_PLAYLIST_IMAGE,
  playlist: playlist.playlist
});

export function fetchPlaylist(playlistId) {
  return (dispatch) => {
    dispatch(requestData());
    return PlaylistAPIUtil.fetchPlaylist(playlistId)
      .then( playlist => dispatch(receivePlaylist(playlist)) );
  };
}

export function createPlaylist(playlist) {
  return (dispatch) => {
    return PlaylistAPIUtil.createPlaylist(playlist)
      .then( playlist => dispatch(receiveNewPlaylist(playlist)) );
  };
}

export function updatePlaylist(playlistId, newName) {
  return (dispatch) => {
    dispatch(requestData());
    return PlaylistAPIUtil.updatePlaylist(playlistId, newName)
      .then( playlist => dispatch(receivePlaylist(playlist)) );
  };
}

export function playPlaylist(playlist) {
  return (dispatch) => {
    dispatch(playListFromState(playlist));
  };
}

export function playAlbum(album) {
  return (dispatch) => {
    dispatch(playAlbumFromState(album));
  };
}

export function requestAddSongToPlaylist(playlistId, songId){
  return (dispatch) => {
    return PlaylistAPIUtil.addSongToPlaylist(playlistId, songId)
      .then( listing => dispatch(addSongToPlaylist(playlistId, songId)) );
  };
}

export function requestRemoveSongFromPlaylist(listingId){
  return (dispatch) => {
    return PlaylistAPIUtil.removeSongFromPlaylist(listingId)
      .then( listing => dispatch(removeSongFromPlaylist(listing)) );
  };
}

export function unfollowPlaylist(followId) {
  return (dispatch) => {
    return PlaylistAPIUtil.unfollowPlaylist(followId)
      .then( playlistFollow => dispatch(toggleFollow(playlistFollow)) );
  };
}

export function followPlaylist(playlistId, userId) {
  return (dispatch) => {
    return PlaylistAPIUtil.followPlaylist(playlistId, userId)
      .then( playlistFollow => dispatch(toggleFollow(playlistFollow)) );
  };
}

export function sendDeletePlaylistRequest(playlistId) {
  return (dispatch) => {
    return PlaylistAPIUtil.deletePlaylist(playlistId)
      .then( () => dispatch(receiveDeletedPlaylistId(playlistId)) );
  };
}

export function updatePlaylistImage(playlistId, formData){
  return (dispatch) => {
    return PlaylistAPIUtil.updatePlaylistImage(playlistId, formData)
      .then( playlist => dispatch(receivePlaylist(playlist)) )
      .then( playlist => dispatch(receiveUpdatedPlaylistImage(playlist)) );
  };
}
