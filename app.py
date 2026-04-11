gh repo create repo-adin --public --source=. --remote=origin --push
gh repo create repo-adin --public --source=. --remote=origin --push
echo "flask" > requirements.txt
echo "gunicorn" >> requirements.txt
echo "web: gunicorn app:app" > Procfile

