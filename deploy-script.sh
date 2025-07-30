#!/bin/bash

echo "🚀 Preparando WaifuConvert para deploy..."

# 1. Instalar dependências
npm install

# 2. Build do projeto
npm run build

# 3. Testar localmente
echo "✅ Testando build local..."
npm start &
sleep 5
curl -f http://localhost:3000 || exit 1
pkill -f "npm start"

# 4. Verificar arquivos essenciais
echo "📋 Verificando arquivos..."
[ -f "app/page.tsx" ] && echo "✅ Página principal OK"
[ -f "app/terms/page.tsx" ] && echo "✅ Terms OK"
[ -f "app/privacy/page.tsx" ] && echo "✅ Privacy OK"
[ -f "app/contact/page.tsx" ] && echo "✅ Contact OK"

echo "🎉 Projeto pronto para deploy!"
