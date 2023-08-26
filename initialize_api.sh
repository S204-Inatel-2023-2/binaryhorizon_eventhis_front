apk add curl

# Utilizado para ambiente de desenvolvimento (quando o docker-compose sobe todos os serviços juntos após build)
export API_HOST="api:8000"

# Utilizado para ambiente local (quando as alterações de front precisam ser refletidas imediatamente)
# export API_HOST="localhost:8000"

# Para executar em ambiente local, subir a API com o docker-compose dela executar as requisições abaixo.
# Requisição para o usuário 'Rosi Joy Participant'
curl -X POST "http://$API_HOST/api/users" \
  -H "Content-Type: multipart/form-data" \
  -F "name=Rosi Joy Participant" \
  -F "email=rosi@example.com" \
  -F "password=senha123" \
  -F "phone=123456789" \
  -F "linkedin=linkedin.com/rosi" \
  -F "company=inatel" \
  -F "photo=BASE64_IMAGE" \

# Requisição para o usuário 'John Johnson Creator'
curl -X POST "http://$API_HOST/api/users" \
  -H "Content-Type: multipart/form-data" \
  -F "name=John Johnson Creator" \
  -F "email=john@example.com" \
  -F "password=senha456" \
  -F "phone=987654321" \
  -F "linkedin=linkedin.com/john" \
  -F "company=4Intelligence" \
  -F "photo=BASE64_IMAGE" \

# Requisição para o usuário 'Carlos Administrator'
curl -X POST "http://$API_HOST/api/users" \
  -H "Content-Type: multipart/form-data" \
  -F "name=Carlos Administrator" \
  -F "email=carl@example.com" \
  -F "password=senha789" \
  -F "phone=456789123" \
  -F "linkedin=linkedin.com/carl" \
  -F "company=Winecombr" \
  -F "photo=BASE64_IMAGE" \
    