json.extract! @playlist, :name, :created_at, :updated_at, :id, :image_url
json.owner @playlist.user.username

if @playlist.followers.include?(current_user)
  json.user_follows true
  json.follow_id PlaylistFollow.get_id_by_user_id_and_playlist_id(
    current_user.id,
    @playlist.id
  )
else
  json.user_follows false
  json.follow_id 0
end

json.tracks do
  sorted_listings = @playlist.playlist_listings.order(:created_at)
  sorted_song_ids = sorted_listings.map do | listing |
    listing.song_id
  end
  json.order sorted_song_ids
  sorted_listings.each do | listing |
    json.set! listing.song_id do
      json.partial! 'api/songs/song', locals: { song: listing.song }
      json.listing_id listing.id
    end
  end

end
#
# json.tracks @playlist.playlist_listings.each do | listing |
#   song = @playlist.songs.find(listing.song_id)
#   json.listing_id listing.id
#   json.partial! 'api/songs/song', locals: { song: song }
# end
