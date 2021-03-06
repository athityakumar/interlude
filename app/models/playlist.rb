# == Schema Information
#
# Table name: playlists
#
#  id                 :integer          not null, primary key
#  user_id            :integer          not null
#  name               :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Playlist < ApplicationRecord

  validates :user, :name, presence: true
  validates_format_of :name, with: /\w/
  validates_uniqueness_of :name, scope: :user_id
  has_attached_file :image,
    default_url: ActionController::Base.helpers.asset_path(
      "#{Rails.application.config.assets.prefix}/missing_playlist.jpg",
      digest: false
    )
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :user
  has_many :playlist_listings,
    dependent: :delete_all
  has_many :songs, through: :playlist_listings
  has_many :albums, through: :songs
  has_many :playlist_follows,
    dependent: :delete_all
  has_many :followers,
    through: :playlist_follows,
    source: :user

  def self.include_tracks_by_id(playlist_id)
    Playlist
      .includes(:playlist_listings, :songs, :user)
      .find(playlist_id)
  end

  def self.get_by_username(username)
    Playlist
      .includes(:songs, :albums)
      .joins("JOIN users ON users.id = playlists.user_id")
      .where("users.username = ?", username)
  end

  def self.get_top_three(search_query)
    Playlist.includes(:user).where('LOWER(name) ~ ?', search_query.downcase).limit(3)
  end

  def image_url
    image.url
  end

end
