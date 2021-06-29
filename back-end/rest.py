import os
import sys

from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
import subprocess

app = Flask(__name__)

app.secret_key = "caircocoders-ednalan"

UPLOAD_FOLDER = './images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


def allowed_file(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def main():
  return 'Homepage'


@app.route('/upload', methods=['POST'])
def upload_file():
  # check if the post request has the file part
  global filename
  if 'files[]' not in request.files:
    resp = jsonify({'message': 'No file part in the request'})
    resp.status_code = 400
    return resp

  files = request.files.getlist('files[]')
  errors = {}
  success = False

  for file in files:
    if file and allowed_file(file.filename):

      filename = secure_filename(file.filename)
      file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      success = True
    else:
      errors[file.filename] = 'File type is not allowed'

  if success and errors:
    errors['message'] = 'File(s) success fully uploaded'
    resp = jsonify(errors)
    resp.status_code = 500
    return resp
  if success:
    filepath = './images/' + filename
    subprocess.run(
      [sys.executable, './yolov5/detect.py', '--source', filepath, '--weights', './yolov5/best.pt', '--conf', '0.1'])
    outputpath = './inference/output/' + filename
    return send_file(outputpath, mimetype='image/jpg')
  else:
    resp = jsonify(errors)
    resp.status_code = 500
    return resp


if __name__ == '__main__':
  app.run(debug=True)
