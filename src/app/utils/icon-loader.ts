export async function loadSvg(path: string): Promise<string> {
  const response = await fetch(path);
  return await response.text();
}