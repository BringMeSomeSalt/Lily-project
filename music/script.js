// Selectors
const player = document.getElementById('player');
const playBtn = document.getElementById('playBtn');
const title = document.getElementById('title');
const songImg = document.getElementById('songImg');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progressContainer');

let index = 0;
const songs = [
    {
        title: 'Shigatsu wa Kimi no Uso OST disc 1',
        file: './file/Shigatsu wa Kimi no Uso OST disc 1.mp3',
        img: './file/ylia.png'
    },
    {
        title: 'Hikaru nara',
        file: './file/Hikaru nara.mp3',
        img: './file/ylia.png'
    },
    { title: 'Orange', 
    file: './file/orange.mp3',
    img: './file/ylia.png' }]
const NUMBER_OF_SONGS = songs.length;

// Functions
const togglePlay = () => {
    playBtn.classList.contains('pause') ?
        player.pause() :
        player.play();

    playBtn.classList.toggle('pause');
}

const forcePlay = () => {
    if (!playBtn.classList.contains('pause'))
        playBtn.classList.add('pause')
    player.play();
}

const setSong = (newIndex) => {
    index = newIndex;
    if (newIndex >= NUMBER_OF_SONGS)
        index = 0;
    if (newIndex < 0)
        index = NUMBER_OF_SONGS - 1;

    songImg.src = songs[index].img;
    player.src = songs[index].file;
    title.innerHTML = songs[index].title;
    forcePlay()
}

const setProgress = (e) => {
    const { duration, currentTime } = e.srcElement;
    // console.log('duration', duration)
    // console.log('currentTime', currentTime)
    if (!duration || !currentTime) return;

    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
}

const setCurrentTime = (e) => {
    debugger
    // console.log(e.offsetX);
    const cursorX = e.offsetX;
    const containerWidth = progressContainer.offsetWidth;
    // console.log('containerWidth', containerWidth);
    player.currentTime = (cursorX / containerWidth) * player.duration
}



// Events handlers
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => setSong(index - 1));
nextBtn.addEventListener('click', () => setSong(index + 1));
// update audio progress
player.addEventListener('timeupdate', setProgress);
// set player song currentTime through click
progressContainer.addEventListener('click', setCurrentTime);