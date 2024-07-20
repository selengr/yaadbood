type MimeTypeMap = { [key: string]: string };
type FileCategory = 'photo' | 'video' | 'image' | 'music' | 'file';

interface FileTypeResult {
  mimeType: string;
  category: FileCategory;
}

const getFileType = (url: string): FileTypeResult => {
  const mimeTypeMap: MimeTypeMap = {
    aac: 'audio/aac',
    abw: 'application/x-abiword',
    arc: 'application/x-freearc',
    avif: 'image/avif',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    bmp: 'image/bmp',
    ico: 'image/vnd.microsoft.icon',
    gif: 'image/gif',
    png: 'image/png',
    svg: 'image/svg+xml',
    tif: 'image/tiff',
    tiff: 'image/tiff',
    webp: 'image/webp',
    avi: 'video/x-msvideo',
    ts: 'video/mp2t',
    mp4: 'video/mp4',
    mpeg: 'video/mpeg',
    ogv: 'video/ogg',
    webm: 'video/webm',
    azw: 'application/vnd.amazon.ebook',
    bin: 'application/octet-stream',
    bz: 'application/x-bzip',
    bz2: 'application/x-bzip2',
    cda: 'application/x-cdf',
    csh: 'application/x-csh',
    css: 'text/css',
    csv: 'text/csv',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    eot: 'application/vnd.ms-fontobject',
    epub: 'application/epub+zip',
    gz: 'application/gzip',
    htm: 'text/html',
    html: 'text/html',
    ics: 'text/calendar',
    jar: 'application/java-archive',
    js: 'text/javascript',
    json: 'application/json',
    jsonld: 'application/ld+json',
    mid: 'audio/midi',
    midi: 'audio/x-midi',
    mjs: 'text/javascript',
    mp3: 'audio/mpeg',
    mpkg: 'application/vnd.apple.installer+xml',
    odp: 'application/vnd.oasis.opendocument.presentation',
    ods: 'application/vnd.oasis.opendocument.spreadsheet',
    odt: 'application/vnd.oasis.opendocument.text',
    oga: 'audio/ogg',
    ogx: 'application/ogg',
    opus: 'audio/opus',
    otf: 'font/otf',
    pdf: 'application/pdf',
    php: 'application/x-httpd-php',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    rar: 'application/vnd.rar',
    rtf: 'application/rtf',
    sh: 'application/x-sh',
    swf: 'application/x-shockwave-flash',
    tar: 'application/x-tar',
    ttf: 'font/ttf',
    txt: 'text/plain',
    vsd: 'application/vnd.visio',
    wav: 'audio/wav',
    weba: 'audio/webm',
    woff: 'font/woff',
    woff2: 'font/woff2',
    xhtml: 'application/xhtml+xml',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    xml: 'application/xml',
    xul: 'application/vnd.mozilla.xul+xml',
    zip: 'application/zip',
    '3gp': 'video/3gpp',
    '3g2': 'video/3gpp2',
    '7z': 'application/x-7z-compressed',
  };
  const extensionMatch = url.match(/\.([0-9a-z]+)(?:[?#]|$)/i);
  if (!extensionMatch) {
    return { mimeType: 'unknown', category: 'file' };
  }

  const extension: string = extensionMatch[1].toLowerCase();
  const mimeType: string = mimeTypeMap[extension] || 'application/octet-stream';

  let category: FileCategory = 'file';
  if (mimeType.startsWith('image/')) {
    category = 'image';
  } else if (mimeType.startsWith('audio/')) {
    category = 'music';
  } else if (mimeType.startsWith('video/')) {
    category = 'video';
  }

  return { mimeType: mimeType, category: category };
};

export { getFileType };
