import React, { useState, useEffect, Fragment } from "react";

function MusicPlayer() {
	const SOUND_URL = "https://assets.breatheco.de/apis/sound/";
	const [songList, setSongList] = useState([]);
	const [myIndex, setMyIndex] = useState(-1);
	const [urlSong, setUrlSong] = useState(
		"https://assets.breatheco.de/apis/sound/files/videogame/songs/zelda_outworld.mp3"
	);
	const [playSong, setplaySong] = useState(false);
	const [currentSongName, setCurrentSongName] = useState("Choose your song!");
	const AUDIO = document.querySelector("#audio");

	useEffect(() => {
		fetch(SOUND_URL.concat("songs"))
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				setSongList(responseAsJson);
				console.log("Song list", responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	const songlist = songList.map((oneSong, index) => {
		return (
			<li
				className="onPlaying"
				key={oneSong.url}
				onClick={() => {
					setUrlSong(SOUND_URL.concat(oneSong.url));
					setMyIndex(index);
					setCurrentSongName(oneSong.name);
					setplaySong(true);
					AUDIO.load();
					AUDIO.play();
				}}>
				{oneSong.name}
			</li>
		);
	});

	function nextSong(songIndex) {
		let newurl = "";

		if (songList[songIndex + 1]) {
			newurl = SOUND_URL.concat(songList[songIndex + 1].url);
			setUrlSong(newurl);
			setMyIndex(songIndex + 1);
			AUDIO.load();
			AUDIO.play();
		} else {
			newurl = SOUND_URL.concat(songList[0].url);
			setUrlSong(newurl);
			setMyIndex(0);
			AUDIO.load();
			AUDIO.play();
		}
	}

	function previusSong(songIndex) {
		let newurl = "";

		if (songList[songIndex - 1]) {
			newurl = SOUND_URL.concat(songList[songIndex - 1].url);
			setUrlSong(newurl);
			setMyIndex(songIndex - 1);
			AUDIO.load();
			AUDIO.play();
		} else {
			newurl = SOUND_URL.concat(songList[songList.length - 1].url);
			setUrlSong(newurl);
			setMyIndex(songList.length - 1);
			AUDIO.load();
			AUDIO.play();
		}
	}

	return (
		<Fragment>
			<div className="img-title-box">
				<h1 className="title-box">Music Player</h1>
			</div>
			<audio id="audio">
				<source src={urlSong} type="audio/mpeg" />
			</audio>
			<div className="button-box">
				<button
					className="button-size btn"
					onClick={() => previusSong(myIndex)}>
					<i className="fa fa-backward" />
				</button>
				<button
					className="button-size btn"
					onClick={() => AUDIO.pause()}>
					<i className="fa fa-pause" />
				</button>
				<button
					className="button-size btn"
					onClick={() => AUDIO.play()}>
					<i className="fa fa-play" />
				</button>
				<button
					className="button-size btn"
					onClick={() => nextSong(myIndex)}>
					<i className="fa fa-forward" />
				</button>
			</div>
			<div className="song-playing">Now Playing: {currentSongName}</div>
			<div className="song-list">{songlist}</div>
		</Fragment>
	);
}

export default MusicPlayer;
