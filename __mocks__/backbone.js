import Backbone from 'backbone';

class Post extends Backbone.Model {}
class Posts extends Backbone.Collection {
  static model = Post;
}

const post = new Post({title: 'title1', desc: 'description1'});
const otherPost = new Post({title: 'title2', desc: 'description2'});
const posts = new Posts([post, otherPost]);

export const backboneState = {
  post: post.toJSON(),
  posts: posts.toJSON(),
}

export const backboneTree = {
  post,
  posts
}
