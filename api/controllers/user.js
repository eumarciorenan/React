import { db } from "../db.js";

export const getCourses = (_, res) => {
  const q = "SELECT * FROM courses";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addCourse = (req, res) => {
  const q =
    "INSERT INTO courses(`name`, `url_video`, `description`) VALUES(?)";

  const values = [
    req.body.name,
    req.body.url_video,
    req.body.description,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateCourse = (req, res) => {
  const q =
    "UPDATE courses SET `name` = ?, `url_video` = ?, `description` = ? WHERE `id` = ?";

  const values = [
    req.body.name,
    req.body.url_video,
    req.body.description,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteCourse = (req, res) => {
  const q = "DELETE FROM courses WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
