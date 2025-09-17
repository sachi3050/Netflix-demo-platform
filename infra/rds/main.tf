resource "aws_db_instance" "postgres" {
  identifier         = "video-platform-db"
  engine             = "postgres"
  instance_class     = "db.t3.medium"
  allocated_storage  = 50
  name               = "videostream"
  username           = var.db_user
  password           = var.db_password
  skip_final_snapshot = true
  publicly_accessible = false
}
