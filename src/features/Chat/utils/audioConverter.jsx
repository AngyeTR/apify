let ffmpegInstance = null;
let fetchFile = null;

export const convertAudio = async (inputBlob, targetFormat = 'ogg') => {
  if (!ffmpegInstance) {
    const ffmpegModule = await import('https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/esm/index.js');
    const { createFFmpeg, fetchFile: fetch } = ffmpegModule;

    ffmpegInstance = createFFmpeg({ log: true });
    fetchFile = fetch;

    await ffmpegInstance.load();
  }

  const inputName = 'input.webm';
  const outputName = `output.${targetFormat}`;

  await ffmpegInstance.FS('writeFile', inputName, await fetchFile(inputBlob));
  await ffmpegInstance.run('-i', inputName, outputName);

  const data = ffmpegInstance.FS('readFile', outputName);
  const convertedBlob = new Blob([data.buffer], { type: `audio/${targetFormat}` });

  return convertedBlob;
};