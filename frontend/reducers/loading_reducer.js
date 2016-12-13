import {
  REQUEST_DATA,
  RECEIVE_ARTIST,
  RECEIVE_ARTISTS,
  RECEIVE_ALBUM,
  RECEIVE_SONG
} from '../actions/music_actions';

import {
  RECEIVE_PLAYLIST,
  RECEIVE_PLAYLISTS_BY_USERNAME,
  UPDATE_PLAYLIST_FOLLOW
} from '../actions/playlist_actions';

import {
  RECEIVE_USER
} from '../actions/user_actions';

function loadingReducer(state = true, action){
  switch(action.type) {
    case REQUEST_DATA:
      return true;
    case RECEIVE_ARTIST:
    case RECEIVE_ARTISTS:
    case RECEIVE_ALBUM:
    case RECEIVE_SONG:
    case RECEIVE_PLAYLISTS_BY_USERNAME:
    case RECEIVE_PLAYLIST:
    case RECEIVE_USER:
    case UPDATE_PLAYLIST_FOLLOW:
      return false;
    default:
      return state;
  }
}

export default loadingReducer;
