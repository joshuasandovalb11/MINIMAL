from flask import Flask, redirect, render_template, request, url_for, session, flash

app = Flask(__name__)
app.secret_key = 'clave_secreta_minimal'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/store')
def store():
    return render_template('store.html')

@app.route('/administrador')
def administrador():
    if 'logged_in' not in session:
        return redirect(url_for('login'))
    return render_template('administrador.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if username == 'admin' and password == '1234':
            session['logged_in'] = True
            return redirect(url_for('administrador'))
        else:
            error = 'Credenciales incorrectas. Por favor, intenta de nuevo.'
            return render_template('login.html', error=error)
        
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)