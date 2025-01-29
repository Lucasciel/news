export function truncateWithEllipses(text, max) {
    return text.slice(0, max-1) + (text.length > max ? '...' : '');
}

export default truncateWithEllipses;