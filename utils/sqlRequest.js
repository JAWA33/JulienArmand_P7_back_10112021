//? ################# Requête pour user : #######################
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

//? ################# Requête pour post : ########################

const allPosts = `SELECT id_post, post_create, post_text,post_url_image, post_id_user, 
user_firstname, user_lastname, user_url_image, user_id_job,
job_name, job_id_service, 
service_name,
(SELECT COUNT(like_id_post) FROM gc_likes WHERE like_id_post = id_post) AS nbr_likes,
(SELECT COUNT(comment_id_post) FROM gc_comments WHERE comment_id_post = id_post) AS nbr_comments,
(SELECT IF(COUNT(like_id_post)=0,"no","yes") FROM gc_likes WHERE like_id_user=? AND like_id_post=id_post) AS i_like_post,
(SELECT IF(COUNT(comment_id_post)=0,"no","yes") FROM gc_comments WHERE comment_id_user=? AND comment_id_post=id_post) AS i_comment_post
FROM gc_posts
INNER JOIN gc_users ON id_user = post_id_user
INNER JOIN gc_jobs ON id_job = user_id_job
INNER JOIN gc_services ON id_service = job_id_service
GROUP BY id_post
ORDER BY post_create DESC`;

const createPost =
  "INSERT INTO gc_posts (post_text, post_url_image, post_id_user) VALUES (?,?,?)";

const updatePost =
  "UPDATE gc_posts SET post_text =? ,post_url_image =? WHERE post_id_user=? AND id_post=?";

const deletePost = "DELETE FROM gc_posts WHERE post_id_user=? AND id_post=?";

//? ################# Requête pour like : ########################

const like = "INSERT INTO gc_likes (like_id_post, like_id_user) VALUES (?,?)";

const dislike = "DELETE FROM gc_likes WHERE like_id_post=? AND like_id_user=?";

//? ################# Requête pour commentaires : ########################
//
const comment =
  "INSERT INTO gc_comments (comment_text,comment_id_post, comment_id_user) VALUES (?,?,?)";

const getComments = "SELECT * FROM gc_comments WHERE comment_id_post=?";
//! Voir pour ajouter l'url image de comment_id_user

const updateComment =
  "UPDATE gc_comments SET comment_text =? WHERE comment_id_user=? AND id_comment=?";

const deleteComment =
  "DELETE FROM gc_comments WHERE comment_id_user=? AND id_comment=?";
//
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
  like: like,
  dislike: dislike,
  comment: comment,
  getComments: getComments,
  updateComment: updateComment,
  deleteComment: deleteComment,
};
