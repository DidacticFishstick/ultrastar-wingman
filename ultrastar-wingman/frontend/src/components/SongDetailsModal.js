// SongDetailsModal.js
import './SongDetailsModal.css';

const SongDetailsModal = ({song, onClose}) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => {
                e.preventDefault();
            }}>
                <h2>{song.title} - {song.artist}</h2>
                <p>{song.directory}</p>
                <p>Duration: {song.duration.toFixed(2)} seconds</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SongDetailsModal;
