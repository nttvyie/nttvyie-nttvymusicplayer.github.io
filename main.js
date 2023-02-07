const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document)

        const player = $('.player')
        const playList = $('.playlist')
        const heading = $('header h2')
        const cdThumb = $('.cd-thumb')
        const audio = $('#audio')
        const playBtn = $('.btn-toggle-play')

        const cd = $('.cd')
        const progress = $('#progress')
        const prevBtn = $('.btn-prev')
        const nextBtn = $('.btn-next')
        const randomBtn = $('.btn-random')
        const repeatBtn = $('.btn-repeat')
        const playedTime = $('.time-audio-left')
        const totalTime = $('.time-audio-right')

        const app = {
            currentIndex: 0,

            isPlaying: false,

            isRandom: false,

            isRepeat: false, 

            songs: [
                {
                    name: 'Ít Nhưng Dài Lâu',
                    singer: 'Yan Nguyễn x Chu Thúy Quỳnh',
                    path: './asset/song/Ít Nhưng Dài Lâu.mp3',
                    img: './asset/img/Ít Nhưng Dài Lâu.jpg'
                },
                {
                    name: 'Tấm Lòng Son',   
                    singer: 'Huỳnh Chương x Pro.MUS',
                    path: './asset/song/Tấm Lòng Son.mp3',
                    img: './asset/img/Tấm Lòng Son.jpg'
                },
                {
                    name: 'Thuyền Quyên',   
                    singer: 'Diệu Kiên (AIR Remix)',
                    path: './asset/song/Thuyền Quyên.mp3',
                    img: './asset/img/Thuyền Quyên.jpg'
                },
                {
                    name: 'Lỡ Yêu Người Đậm Sâu',   
                    singer: 'Linh Hương Luz (RIN Music Remix)',
                    path: './asset/song/Lỡ Yêu Người Đậm Sâu.mp3',
                    img: './asset/img/Lỡ Yêu Người Đậm Sâu.jpg'
                },
                {
                    name: 'Vương Vấn',   
                    singer: 'Linh Hương Luz (Qinn Remix x TVk x Hana Cẩm Tiên )',
                    path: './asset/song/Vương Vấn.mp3',
                    img: './asset/img/Vương Vấn.jpg'
                },
                {
                    name: 'Bài Này Chill Phết',
                    singer: 'Đen ft. MIN',
                    path: './asset/song/Bài Này Chill Phết.mp3',
                    img: './asset/img/Bài Này Chill Phết.jpg',
                },
                {
                    name: 'abcdefu',
                    singer: 'GAYLE',
                    path: './asset/song/abcdefu.mp3',
                    img: './asset/img/abcdefu.jpg',
                },
                {
                    name: 'Đố Em Biết Anh Đang Nghĩ Gì',
                    singer: 'Đen x JustaTee',
                    path: './asset/song/Đố em biết anh đang nghĩ gì.mp3',
                    img: './asset/img/Đố Em Biết Anh Đang Nghĩ Gì.jpg',
            
                },
                {
                    name: 'So Pretty',
                    singer: 'Reyanna Maria',
                    path: './asset/song/So Pretty.mp3',
                    img: './asset/img/So Pretty.jpg',
                },
                {
                    name: 'Closer',
                    singer: 'The Chainsmokers',
                    path: './asset/song/Closer.mp3',
                    img: './asset/img/Closer.jpg',
                },
                {
                    name: 'Mad at Disney',
                    singer: 'Salem ilese',
                    path: './asset/song/Mad at Disney.mp3',
                    img: './asset/img/Mad at Disney.jpg',
                },
                {
                    name: 'Starboy',
                    singer: 'Weeknd',
                    path: './asset/song/Starboy.mp3',
                    img: './asset/img/Starboy.jpg',
                },
                {
                    name: 'Comethru',
                    singer: 'Jeremy Zucker',
                    path: './asset/song/comethru.mp3',
                    img: './asset/img/Comethru.jpg',
                }

            ],
            
            render: function() {
                const htmls = this.songs.map((song, index) => {
                    return `
                        <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                            <div class="thumb" style="background-image: url('${song.img}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `
                });
                playList.innerHTML = htmls.join('');
            },

            defineProperties: function() {
                Object.defineProperty(this, 'currentSong', {
                    get: function(){
                        return this.songs[this.currentIndex]
                    }
                })
            },
            
            handleEvent: function(){
                const _this = this
                const cdWidth = cd.offsetWidth
                
                // Xử lý CD quay và dừng
                
                const cdThumbAnimate = cdThumb.animate([
                    {transform: 'rotate(360deg)'}
                    ], {
                        duration: 10000,
                        iterations: Infinity
                    })
                
                    cdThumbAnimate.pause()

                // Xử lý phóng to / thu nhỏ CD
                document.onscroll = function() {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop
                    const newCdWidth = cdWidth - scrollTop
                    cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
                    cd.style.opacity = newCdWidth / cdWidth
                }

                // Xử lý khi click play
                playBtn.onclick = function() {
                    if (_this.isPlaying) {
                        audio.pause()
                    } else {
                        audio.play()
                    }
                }

                // Khi bài hát được play
                audio.onplay = function() {
                    _this.isPlaying = true
                    player.classList.add('playing')
                    cdThumbAnimate.play()
                }

                // Khi bài hát được pause
                audio.onpause = function() {
                    _this.isPlaying = false
                    player.classList.remove('playing')
                    cdThumbAnimate.pause()
                }

                // Khi tiến độ bài hát thay đổi
                audio.ontimeupdate = function() {
                    if(audio.duration) {
                        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                        progress.value = progressPercent}
                    // ------------Hiển thị thời gian bài hát------------
                    // Trả về số phút
                    let playedMinutes = Math.floor(audio.currentTime/60)
                    // Trả về số giây
                    let playedSeconds = Math.floor(audio.currentTime - playedMinutes * 60)
                    if(playedMinutes < 10) {
                        playedMinutes = `0${playedMinutes}`
                    }
                    if(playedSeconds < 10) {
                        playedSeconds = `0${playedSeconds}`
                    }
                    playedTime.innerText = `${playedMinutes}:${playedSeconds}`
                }

                audio.onloadedmetadata = function(){
                    // ------------Hiển thị thời gian còn lại của bài hát------------
                    // Trả về số phút
                    let minutes = Math.floor(audio.duration/60)
                    // Trả về số giây
                    let seconds = Math.floor(audio.duration- minutes * 60) 
                    if(minutes < 10){
                        minutes = `0${minutes}`
                    }
                    if(seconds < 10){
                        seconds = `0${seconds}`
                    }
                    totalTime.innerText = `${minutes}:${seconds}`
                }

                // Xử lý khi tua bài hát
                progress.oninput = function(e) {
                    const seekTime = audio.duration / 100 * e.target.value
                    audio.currentTime = seekTime
                }
                
                // Khi next song
                nextBtn.onclick = function() {
                   if (_this.isRandom) {
                    _this.playRandom()
                   } else {
                    _this.nextSong()
                   }
                    audio.play()
                    _this.render()
                }

                // Khi pre song
                prevBtn.onclick = function() {
                    if (_this.isRandom) {
                    _this.playRandom()
                   } else {
                    _this.prevSong()
                   }
                    audio.play()
                    _this.render()
                }

                // Bật / tắt chế độ random
                randomBtn.onclick = function() {
                    if (_this.isRandom) {
                        _this.isRandom = false;
                        randomBtn.classList.remove('active')
                    } else {
                        _this.isRandom = true;
                        randomBtn.classList.add('active')
                    }
                }

                // Bài tiếp theo được phát khi hết
                audio.onended = function() {
                    if(_this.isRepeat){
                        audio.play()
                    } else {
                        nextBtn.onclick()
                    }  
                } 

                // Khi nhấp vào nút Repeat 
                repeatBtn.onclick = function() {
                    if(_this.isRepeat) {
                        _this.isRepeat = false;
                        repeatBtn.classList.remove('active')
                    }
                    else {
                        _this.isRepeat = true;
                        repeatBtn.classList.add('active')
                    }
                }

                // Bài hát trong playlist sẽ hát khi click vào
                playList.onclick = function(e) {
                    const songNode = e.target.closest('.song:not(.active)')
                    if(songNode || e.target.closest('.song:not(.option)')) {
                        if(songNode) {
                            _this.currentIndex = Number(songNode.dataset.index)
                            _this.loadCurrentSong()
                            _this.render()
                            audio.play()
                        }
                    }
                }
            },
            
            loadCurrentSong: function() {
                heading.textContent = this.currentSong.name
                cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
                audio.src = this.currentSong.path
            },

            nextSong: function() {
                this.currentIndex++
                if (this.currentIndex >= this.songs.length) {
                    this.currentIndex = 0
                }
                this.loadCurrentSong()
            },

            prevSong: function() {
                this.currentIndex--
                if (this.currentIndex < 0) {
                    this.currentIndex = this.songs.length - 1
                }
                this.loadCurrentSong()
            },

            playRandom: function() {
                let newIndex
                do{
                    newIndex = Math.floor(Math.random() * this.songs.length)
                } while (newIndex === this.currentIndex)

                this.currentIndex = newIndex
                this.loadCurrentSong()
            },
           
            start: function(){
                // Định nghĩa các thuộc tính cho object
                this.defineProperties()

                // Lắng nghe / Xử lý các sự kiện (DOM events)
                this.handleEvent()

                // Tải thông tin bài hát đầu tiên vào UI khi vào ứng dụng
                this.loadCurrentSong()

                // Render playlist
                this.render()
            }
        }

        app.start();