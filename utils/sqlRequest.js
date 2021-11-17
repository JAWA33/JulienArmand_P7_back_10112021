const signup =
  "INSERT INTO gc_users (user_firstname, user_email, user_password, user_id_job) VALUES (?,?,?,?)";

const login = "SELECT * FROM gc_users WHERE user_email =?";

const allUser =
  "SELECT id_user, user_firstname,user_lastname,user_email,user_phone,user_age,user_bio,user_skill,user_hobbie, user_url_image,job_name,service_name,job_position FROM gc_users INNER JOIN gc_jobs ON user_id_job=id_job INNER JOIN gc_services ON job_id_service=id_service";

const oneUser =
  "SELECT id_user, user_firstname,user_lastname,user_email,user_phone,user_age,user_bio,user_skill,user_hobbie, user_url_image,job_name,service_name,job_position FROM gc_users INNER JOIN gc_jobs ON user_id_job=id_job INNER JOIN gc_services ON job_id_service=id_service WHERE id_user=?";

const checkUser = "SELECT id_user FROM gc_users WHERE id_user=?";

module.exports = {
  signup: signup,
  login: login,
  allUser: allUser,
  oneUser: oneUser,
  checkUser: checkUser,
};
