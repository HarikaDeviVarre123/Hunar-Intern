// ── MOVIE DATA ──
var movies = [
  { title: "Interstellar", year: "2014", dur: "2h 49m", match: "98% Match", desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=70" },
  { title: "The Dark Knight", year: "2008", dur: "2h 32m", match: "96% Match", desc: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=70" },
  { title: "Inception", year: "2010", dur: "2h 28m", match: "95% Match", desc: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=70" },
  { title: "Avengers: Endgame", year: "2019", dur: "3h 1m", match: "97% Match", desc: "After the devastating events of Avengers: Infinity War, the universe is in ruins. The Avengers assemble once more to reverse Thanos' actions.", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=70" },
  { title: "The Matrix", year: "1999", dur: "2h 16m", match: "94% Match", desc: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", img: "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?w=400&q=70" },
  { title: "Dune", year: "2021", dur: "2h 35m", match: "93% Match", desc: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.", img: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400&q=70" },
  { title: "Joker", year: "2019", dur: "2h 2m", match: "91% Match", desc: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.", img: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=400&q=70" },
  { title: "Spider-Man: NWH", year: "2021", dur: "2h 28m", match: "96% Match", desc: "Peter Parker's secret identity is revealed and he asks Doctor Strange for help, but things go dangerously wrong.", img: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=400&q=70" },
];

// ── TV SHOW DATA ──
var tvShows = [
  { title: "Breaking Bad", year: "2008", dur: "5 Seasons", match: "99% Match", desc: "A chemistry teacher turned meth manufacturer partners with a former student to build a drug empire.", img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70" },
  { title: "Stranger Things", year: "2016", dur: "4 Seasons", match: "97% Match", desc: "A group of kids encounter supernatural forces and secret government exploits in Hawkins, Indiana.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=70" },
  { title: "Money Heist", year: "2017", dur: "5 Seasons", match: "95% Match", desc: "A criminal mastermind who goes by The Professor has a plan to pull off the biggest heist in recorded history.", img: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=400&q=70" },
  { title: "Dark", year: "2017", dur: "3 Seasons", match: "96% Match", desc: "A family saga with a supernatural twist set in a German town where four families are affected by the disappearance of two children.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=70" },
  { title: "Squid Game", year: "2021", dur: "2 Seasons", match: "94% Match", desc: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games.", img: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=400&q=70" },
  { title: "The Witcher", year: "2019", dur: "3 Seasons", match: "90% Match", desc: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.", img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=70" },
];

var trending = [movies[3], movies[1], tvShows[1], movies[0], tvShows[4], tvShows[2], movies[6], tvShows[0]];

// ── RENDER ROWS ──
var content = document.getElementById('content');

function makeRow(title, items) {
  var section = document.createElement('div');
  section.className = 'section';
  section.innerHTML = '<h2>' + title + '</h2>';

  var row = document.createElement('div');
  row.className = 'movies-row';

  items.forEach(function(item) {
    var card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = '<img src="' + item.img + '" alt="' + item.title + '" /><div class="card-title">' + item.title + '</div>';
    card.onclick = function() { openModal(item); };
    row.appendChild(card);
  });

  section.appendChild(row);
  content.appendChild(section);
}

makeRow('Trending Now', trending);
makeRow('Popular Movies', movies);
makeRow('Top TV Shows', tvShows);

// ── MODAL ──
function openModal(item) {
  document.getElementById('modalImg').src = item.img;
  document.getElementById('modalTitle').textContent = item.title;
  document.getElementById('modalYear').textContent = item.year;
  document.getElementById('modalDur').textContent = item.dur;
  document.getElementById('modalMatch').textContent = item.match;
  document.getElementById('modalDesc').textContent = item.desc;
  document.getElementById('modalPlayBtn').onclick = function() {
    closeModal();
    openPlayer(item.img, item.title);
  };
  document.getElementById('modalOverlay').classList.add('show');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
}

// close modal when clicking outside
document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ── VIDEO PLAYER ──
var isPlaying = false;
var progressVal = 0;
var interval = null;

function openPlayer(imgSrc, title) {
  document.getElementById('playerImg').src = imgSrc;
  document.getElementById('playerOverlay').classList.add('show');
  isPlaying = false;
  progressVal = 0;
  document.getElementById('progressBar').style.width = '0%';
  document.getElementById('playIcon').textContent = '\u25B6';
  document.getElementById('ctrlBtn').textContent = '\u25B6';
  document.getElementById('timeDisplay').textContent = '0:00 / 2:49:00';
  clearInterval(interval);
}

function closePlayer() {
  document.getElementById('playerOverlay').classList.remove('show');
  clearInterval(interval);
  isPlaying = false;
}

function togglePlay() {
  isPlaying = !isPlaying;
  document.getElementById('playIcon').textContent = isPlaying ? '\u23F8' : '\u25B6';
  document.getElementById('ctrlBtn').textContent = isPlaying ? '\u23F8' : '\u25B6';

  if (isPlaying) {
    interval = setInterval(function() {
      progressVal += 0.05;
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(interval);
      }
      document.getElementById('progressBar').style.width = progressVal + '%';
      var secs = Math.floor(progressVal / 100 * 10140);
      var m = Math.floor(secs / 60);
      var s = secs % 60;
      document.getElementById('timeDisplay').textContent = m + ':' + (s < 10 ? '0' : '') + s + ' / 2:49:00';
    }, 300);
  } else {
    clearInterval(interval);
  }
}

function seekBar(e) {
  var bar = e.currentTarget;
  var rect = bar.getBoundingClientRect();
  progressVal = ((e.clientX - rect.left) / rect.width) * 100;
  document.getElementById('progressBar').style.width = progressVal + '%';
}