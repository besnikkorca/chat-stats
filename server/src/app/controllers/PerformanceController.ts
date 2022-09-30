import { Request, Response } from 'express';

function test(req: Request, res: Response) {
  return res.json({ success: true });
}

export default {
  test,
};
