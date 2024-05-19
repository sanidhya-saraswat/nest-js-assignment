module.exports = class CreateDummyUsers1716047232018 {
  async up(queryRunner) {
    const bcrpyt = require('bcrypt');
    let password = bcrpyt.hashSync('admin', 10);
    await queryRunner.query(
      `INSERT INTO user (username, password, isAdmin) VALUES ('admin','${password}',true)`,
    );
    password = bcrpyt.hashSync('sam', 10);
    await queryRunner.query(
      `INSERT INTO user (username, password, isAdmin) VALUES ('sam','${password}',false)`,
    );
    await queryRunner.query(
      `INSERT into course('title') values('Docker for dummies')`,
    );
    await queryRunner.query(
      `INSERT into course('title') values('MySQL for dummies')`,
    );
    await queryRunner.query(
      `INSERT into lesson('title','courseId') values('Basics of docker',1)`,
    );
    await queryRunner.query(
      `INSERT into lesson('title','courseId') values('How docker works',1)`,
    );
    await queryRunner.query(
      `INSERT into lesson('title','courseId') values('Basics of MySQL',2)`,
    );
    await queryRunner.query(
      `INSERT into lesson('title','courseId') values('How MySQL works',2)`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `DELETE FROM user where username = 'admin' or username='sam'`,
    );
    await queryRunner.query(
      `DELETE FROM lesson where title = 'Basics of docker' or title='How docker works' or title='Basics of MySQL' or title='How MySQL works'`,
    );
    await queryRunner.query(
      `DELETE FROM course where title = 'Docker for dummies' or title='MySQL for dummies'`,
    );
  }
};
