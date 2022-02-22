// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.setHeader('Cache-control', 'public, max-age=0, s-maxage=600, immutable, stale-while-revalidate')
  res.status(200).json({ nowCached: Date.now() })
}
