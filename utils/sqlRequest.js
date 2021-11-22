//! ################# Requête pour user : #######################
const signup =
  "INSERT INTO gc_users (user_firstname, user_email, user_password, user_id_job,user_url_image) VALUES (?,?,?,?,?)";

const login = "SELECT * FROM gc_users WHERE user_email =?";

const updateLastConnect =
  "UPDATE gc_users SET user_lastconnect = CURRENT_TIMESTAMP WHERE id_user=?";

const allUser =
  "SELECT id_user, user_firstname,user_lastname,user_email,user_phone,user_age,user_bio,user_skill,user_hobbie, user_url_image,job_name,service_name,job_position FROM gc_users INNER JOIN gc_jobs ON user_id_job=id_job INNER JOIN gc_services ON job_id_service=id_service";

const oneUser =
  "SELECT id_user, user_firstname,user_lastname,user_email,user_phone,user_age,user_bio,user_skill,user_hobbie, user_url_image,job_name,service_name,job_position FROM gc_users INNER JOIN gc_jobs ON user_id_job=id_job INNER JOIN gc_services ON job_id_service=id_service WHERE id_user=?";

const checkUser = "SELECT id_user FROM gc_users WHERE id_user=?";

const updateUser =
  "UPDATE gc_users SET user_firstname =? ,user_lastname =? ,user_phone =? ,user_age =?, user_bio =? ,user_skill =?,user_hobbie =?, user_url_image =?,user_id_job= ? WHERE id_user=?";

const deleteUser = "DELETE FROM gc_users WHERE id_user = ?";

//! ################# Requête pour post : ########################

const allPosts = "SELECT * FROM gc_posts";

const createPost =
  "INSERT INTO gc_posts (post_text, post_url_image, post_id_user) VALUES (?,?,?)";

const updatePost =
  "UPDATE gc_posts SET post_text =? ,post_url_image =? WHERE post_id_user=? AND id_post=?";

const deletePost = "DELETE FROM gc_posts WHERE post_id_user=? AND id_post=?";

module.exports = {
  signup: signup,
  login: login,
  allUser: allUser,
  oneUser: oneUser,
  checkUser: checkUser,
  updateUser: updateUser,
  updateLastConnect: updateLastConnect,
  deleteUser: deleteUser,
  allPosts: allPosts,
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost,
};
