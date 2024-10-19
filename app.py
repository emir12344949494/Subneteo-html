from flask import Flask, render_template, request, redirect, url_for, jsonify, flash

# Inicializa la aplicación Flask
app = Flask(__name__)

@app.route('/')
def  xx():
    return render_template('xx.html')

@app.route('/TablaRed')
def TablaRed():
    return render_template('TablaRed.html')

if __name__ == '__main__':
    app.run(debug=True)

