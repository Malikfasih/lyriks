import { useParams } from 'react-router-dom'; // this will give us access to song id we have in url bar.
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams(); // as we given the name of id to the route to this page as '/artist/:artistid'
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId); // we pass 'artistId' without {} it's a choice.

  console.log(artistData?.songs);

  if (isFetchingArtistDetails) return <Loader title="Loading artist details" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={Object.values(artistData?.songs)} // Object.value to format our songs in a proper way, so we can render the songs from that artist.
        artistId={artistId}
        activeSong={activeSong}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default ArtistDetails;
