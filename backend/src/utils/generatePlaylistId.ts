export function generatePlaylistId() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");

    return Number(timestamp + random);
}