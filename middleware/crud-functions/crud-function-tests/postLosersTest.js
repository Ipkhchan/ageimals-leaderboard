const db = require('../../../firebase.js');
const postLosers = require('../postLosers.js');
const should = require('chai').should();

describe('postLosers', function() {
  it('should return true for adding user to db', async function() {
    response = await postLosers(['nash']);
    revertProdData(['nash']);
    response.should.equal(true);
  });
});

function revertProdData(userHandles) {
  var ref = db.collection('users');
  const document = ref.doc(userHandles[0]);
  document
    .update({
      losses: admin.firestore.FieldValue.increment(-1),
      lossStreak: admin.firestore.FieldValue.increment(-1),
      winStreak: 0,
    })
    .then(function() {
      console.log('successfully updated!');
    })
    .catch(function(error) {
      console.error('Error writing user: ', error);
    });
}
