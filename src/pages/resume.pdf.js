export async function GET({ params, request }) {
    const file = path.join(process.cwd(), 'public', 'resume.pdf');
    var b = Buffer.from(readFileSync(file, 'binary'), 'binary');
    response.headers.set('Content-Type', 'application/pdf');
    return response.end(b);
}