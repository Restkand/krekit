/**
 * Episode Instagram Krekit dari src/data/instagram.json, dipakai halaman Dari Instagram dan kotak
 * "Dibahas di Instagram" di pelajaran dan Kamus. Episode yang tanggalnya belum lewat (WIB, saat build)
 * belum ditampilkan, jadi jadwal unggahan bisa diisi lebih dulu.
 */
import data from '../data/instagram.json'

export const INSTAGRAM = data

/** Episode yang sudah tayang, terbaru di atas. Di tanggal yang sama, urutan di JSON = urutan unggah */
export function publishedEpisodes() {
  const today = new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10)
  return data.episodes
    .map((e, i) => ({ ...e, i }))
    .filter((e) => e.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date) || b.i - a.i)
}

/** Episode yang menautkan halaman ini, mis. path '/kamus/dasar/delta-time/' (tanpa base, tanpa #bagian) */
export function episodesFor(path) {
  return publishedEpisodes().filter((e) => e.links.some((link) => link.href.split('#')[0] === path))
}

/** Label seri + nomor, mis. "Bedah #1" */
export const seriesLabel = (e) => `${data.series[e.series].label}${e.num ? ` #${e.num}` : ''}`

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00+07:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' })
