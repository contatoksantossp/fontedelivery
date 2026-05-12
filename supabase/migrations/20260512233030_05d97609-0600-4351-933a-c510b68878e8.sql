
-- ============================================================
-- ENUMS
-- ============================================================
create type pedido_status as enum ('rascunho','pendente','pronto','em_rota','entregue','cancelado');
create type pedido_tipo as enum ('entrega','retirada');
create type pedido_canal as enum ('balcao','whatsapp','99food','ifood','app','telefone');
create type pagamento_metodo as enum ('dinheiro','pix','cartao_credito','cartao_debito','qr');
create type unidade_medida as enum ('un','kg','L','ml','g','pct');
create type kit_tipo as enum ('kit','combo');
create type desconto_tipo as enum ('%','R$');
create type movimento_tipo as enum ('entrada','saida','perda','correcao');
create type rota_status as enum ('pendente','em_rota','finalizada','concluida');
create type parada_status as enum ('pendente','entregue');
create type transacao_tipo as enum ('entrada','saida');
create type transacao_metodo as enum ('dinheiro','pix','cartao','qrcode');
create type transacao_origem as enum ('venda','acerto','sangria','reforco','manual');
create type cupom_tipo as enum ('percentual','fixo');
create type promo_desconto_tipo as enum ('percentual','fixo','nenhum');
create type faixa_tipo as enum ('cliente','entregador');

-- ============================================================
-- HELPERS
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- ============================================================
-- CATÁLOGO
-- ============================================================
create table public.categorias (
  id text primary key,
  nome text not null, descricao text, imagem_url text,
  ativo boolean not null default true, ordem int not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.subcategorias (
  id text primary key,
  categoria_id text not null references categorias(id) on delete cascade,
  nome text not null, descricao text, imagem_url text,
  ativo boolean not null default true, ordem int not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.produtos (
  id text primary key,
  subcategoria_id text not null references subcategorias(id) on delete cascade,
  categoria_id text not null references categorias(id) on delete cascade,
  nome text not null, descricao text, foto_url text,
  preco_base numeric(10,2) not null default 0,
  destaque boolean not null default false, ativo boolean not null default true,
  codigo_barras text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.variantes (
  id text primary key,
  produto_id text not null references produtos(id) on delete cascade,
  nome text not null, descricao text, foto_url text,
  tags text[] not null default '{}', ean text,
  custo numeric(10,2) not null default 0,
  valor_venda numeric(10,2) not null default 0,
  estoque_minimo int not null default 0,
  estoque_atual int not null default 0,
  unidade unidade_medida not null default 'un',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.kits_combos (
  id text primary key,
  nome text not null, imagem_url text,
  ativo boolean not null default true,
  tipo kit_tipo not null default 'kit',
  tipo_desconto desconto_tipo not null default '%',
  valor_desconto numeric(10,2) not null default 0,
  subcategoria_vinculo_id text references subcategorias(id) on delete set null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.kit_slots (
  id text primary key,
  kit_id text not null references kits_combos(id) on delete cascade,
  subcategoria_id text not null references subcategorias(id) on delete cascade,
  nome text not null, ordem int not null default 0
);

-- ============================================================
-- PARCEIROS
-- ============================================================
create table public.clientes (
  id text primary key,
  nome text not null, apelido text, telefone text,
  data_cadastro date not null default current_date,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.cliente_enderecos (
  id text primary key,
  cliente_id text not null references clientes(id) on delete cascade,
  rua text not null, numero text, bairro text not null,
  complemento text, cep text, cidade text default 'São Paulo',
  principal boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.colaboradores (
  id text primary key,
  cliente_id text not null references clientes(id) on delete cascade,
  cargo text not null, data_inicio date not null default current_date,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.entregadores (
  id text primary key,
  cliente_id text not null references clientes(id) on delete cascade,
  veiculo text not null, online boolean not null default false,
  total_mes numeric(10,2) not null default 0,
  cor text not null default '#3b82f6',
  created_at timestamptz not null default now()
);

create table public.fornecedores (
  id text primary key,
  nome_fantasia text not null, razao_social text, cnpj text,
  contato_nome text, telefone text, endereco text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.fornecedor_compras (
  id text primary key,
  fornecedor_id text not null references fornecedores(id) on delete cascade,
  data date not null, descricao text, valor numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

create table public.compra_itens (
  id uuid primary key default gen_random_uuid(),
  compra_id text not null references fornecedor_compras(id) on delete cascade,
  nome text not null, qtd numeric(10,2) not null, valor_unit numeric(10,2) not null
);

create table public.enderecos_cache (
  id text primary key,
  rua text not null, numero text, bairro text not null,
  cep text, cidade text default 'São Paulo',
  created_at timestamptz not null default now()
);

-- ============================================================
-- ESTOQUE
-- ============================================================
create table public.estoque_movimentos (
  id uuid primary key default gen_random_uuid(),
  variante_id text not null references variantes(id) on delete cascade,
  tipo movimento_tipo not null,
  quantidade int not null,
  saldo_final int not null,
  observacao text,
  data_hora timestamptz not null default now()
);

create table public.estoque_fila_espera (
  id uuid primary key default gen_random_uuid(),
  cliente_nome text not null,
  variante_id text references variantes(id) on delete cascade,
  variante_nome text,
  contato text,
  data_solicitacao timestamptz not null default now()
);

-- ============================================================
-- PEDIDOS
-- ============================================================
create table public.pedidos (
  id text primary key,
  codigo text not null,
  cliente_id text references clientes(id) on delete set null,
  cliente_nome text not null,
  cliente_telefone text,
  endereco_texto text, bairro text,
  lat double precision, lng double precision,
  tipo pedido_tipo not null default 'entrega',
  canal pedido_canal not null default 'balcao',
  status pedido_status not null default 'pendente',
  subtotal numeric(10,2) not null default 0,
  taxa_entrega numeric(10,2) not null default 0,
  desconto numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  forma_pagamento text,
  observacoes text,
  criado_em timestamptz not null default now(),
  pronto_em timestamptz,
  updated_at timestamptz not null default now()
);

create table public.pedido_itens (
  id uuid primary key default gen_random_uuid(),
  pedido_id text not null references pedidos(id) on delete cascade,
  variante_id text references variantes(id) on delete set null,
  produto_id text references produtos(id) on delete set null,
  nome text not null, variante_nome text,
  qtd numeric(10,2) not null, preco numeric(10,2) not null, obs text,
  combo_grupo_id text
);

create table public.pedido_pagamentos (
  id uuid primary key default gen_random_uuid(),
  pedido_id text not null references pedidos(id) on delete cascade,
  metodo pagamento_metodo not null,
  valor numeric(10,2) not null,
  troco numeric(10,2)
);

-- ============================================================
-- ROTAS
-- ============================================================
create table public.rotas (
  id text primary key,
  entregador_id text references entregadores(id) on delete set null,
  entregador_nome text not null,
  entregador_veiculo text,
  entregador_lat double precision, entregador_lng double precision,
  status rota_status not null default 'pendente',
  acao_anterior text, proxima_acao text,
  tempo_estimado int default 0, km_total numeric(10,2) default 0,
  bonificacao numeric(10,2) default 0,
  inicio_rota timestamptz, fim_rota timestamptz,
  created_at timestamptz not null default now()
);

create table public.rota_paradas (
  id text primary key,
  rota_id text not null references rotas(id) on delete cascade,
  pedido_id text references pedidos(id) on delete set null,
  pedido_codigo text not null,
  cliente text not null, telefone text,
  endereco text, bairro text,
  lat double precision, lng double precision,
  km numeric(10,2) default 0,
  taxa_entrega numeric(10,2) default 0,
  total_pedido numeric(10,2) default 0,
  desconto numeric(10,2) default 0,
  forma_pagamento text, observacoes text, origem text,
  parada_status parada_status not null default 'pendente',
  baixa_realizada boolean not null default false,
  ordem int not null default 0,
  criado_em timestamptz not null default now()
);

create table public.rota_parada_itens (
  id uuid primary key default gen_random_uuid(),
  parada_id text not null references rota_paradas(id) on delete cascade,
  nome text not null, qtd numeric(10,2) not null, preco numeric(10,2) not null
);

-- ============================================================
-- FINANCEIRO
-- ============================================================
create table public.caixa_sessoes (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'aberto',
  fundo_inicial numeric(10,2) not null default 0,
  entradas numeric(10,2) not null default 0,
  saidas numeric(10,2) not null default 0,
  saldo_esperado numeric(10,2) not null default 0,
  abertura timestamptz not null default now(),
  fechamento timestamptz,
  saldo_fechamento numeric(10,2)
);

create table public.transacoes (
  id text primary key,
  descricao text not null,
  tipo transacao_tipo not null,
  metodo transacao_metodo not null,
  valor numeric(10,2) not null,
  origem transacao_origem not null,
  data_hora timestamptz not null default now()
);

create table public.entregador_turnos (
  id text primary key,
  entregador_id text references entregadores(id) on delete set null,
  nome text not null, veiculo text,
  data date not null default current_date,
  entregas int not null default 0,
  total_taxas numeric(10,2) not null default 0,
  total_bonificacoes numeric(10,2) not null default 0,
  diaria numeric(10,2) not null default 0,
  pago boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.turno_extras (
  id uuid primary key default gen_random_uuid(),
  turno_id text not null references entregador_turnos(id) on delete cascade,
  valor numeric(10,2) not null, descricao text not null
);

-- ============================================================
-- CUPONS & PROMOÇÕES
-- ============================================================
create table public.cupons (
  id text primary key,
  codigo text not null unique,
  tipo cupom_tipo not null,
  valor numeric(10,2) not null,
  pedido_minimo numeric(10,2) not null default 0,
  total_usos int not null default 0,
  expiracao date,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.promocoes_banner (
  id text primary key,
  nome text not null, descricao text,
  imagem_url text,
  tipo_desconto promo_desconto_tipo not null default 'nenhum',
  valor_desconto numeric(10,2) not null default 0,
  ativo boolean not null default true,
  ordem int not null default 0,
  created_at timestamptz not null default now()
);

create table public.promocao_produtos (
  id uuid primary key default gen_random_uuid(),
  promocao_id text not null references promocoes_banner(id) on delete cascade,
  produto_nome text not null, variante_nome text,
  preco_original numeric(10,2) not null,
  preco_final numeric(10,2) not null
);

-- ============================================================
-- CONFIGURAÇÕES
-- ============================================================
create table public.perfil_loja (
  id int primary key default 1 check (id = 1),
  nome_loja text not null default 'A Fonte Delivery',
  telefone text, endereco text, logo_url text,
  loja_aberta boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.horarios_funcionamento (
  id uuid primary key default gen_random_uuid(),
  dia text not null, ordem int not null,
  abertura text not null default '08:00',
  fechamento text not null default '22:00',
  ativo boolean not null default true
);

create table public.faixas_taxa (
  id text primary key,
  tipo faixa_tipo not null,
  km_inicial numeric(10,2) not null,
  km_final numeric(10,2) not null,
  preco numeric(10,2) not null
);

-- ============================================================
-- INDEXES
-- ============================================================
create index on subcategorias (categoria_id);
create index on produtos (subcategoria_id);
create index on variantes (produto_id);
create index on cliente_enderecos (cliente_id);
create index on pedido_itens (pedido_id);
create index on pedido_pagamentos (pedido_id);
create index on rota_paradas (rota_id);
create index on pedidos (status);

-- ============================================================
-- RLS - todas as tabelas habilitadas
-- ============================================================
do $$ declare t text;
begin
  for t in
    select tablename from pg_tables
    where schemaname='public' and tablename in (
      'categorias','subcategorias','produtos','variantes','kits_combos','kit_slots',
      'clientes','cliente_enderecos','colaboradores','entregadores','fornecedores',
      'fornecedor_compras','compra_itens','enderecos_cache',
      'estoque_movimentos','estoque_fila_espera',
      'pedidos','pedido_itens','pedido_pagamentos',
      'rotas','rota_paradas','rota_parada_itens',
      'caixa_sessoes','transacoes','entregador_turnos','turno_extras',
      'cupons','promocoes_banner','promocao_produtos',
      'perfil_loja','horarios_funcionamento','faixas_taxa'
    )
  loop
    execute format('alter table public.%I enable row level security', t);
    -- read: any authenticated
    execute format('create policy %I on public.%I for select to authenticated using (true)', t||'_sel', t);
    -- write (insert/update): any authenticated
    execute format('create policy %I on public.%I for insert to authenticated with check (true)', t||'_ins', t);
    execute format('create policy %I on public.%I for update to authenticated using (true)', t||'_upd', t);
    -- delete: admin only
    execute format('create policy %I on public.%I for delete to authenticated using (public.has_role(auth.uid(),''admin''::app_role))', t||'_del', t);
  end loop;
end $$;

-- ============================================================
-- updated_at triggers
-- ============================================================
do $$ declare t text;
begin
  for t in
    select tablename from pg_tables
    where schemaname='public' and tablename in (
      'categorias','subcategorias','produtos','variantes','kits_combos',
      'clientes','fornecedores','pedidos','perfil_loja'
    )
  loop
    execute format('create trigger %I before update on public.%I for each row execute function public.set_updated_at()', t||'_upd_at', t);
  end loop;
end $$;

-- ============================================================
-- Seed singletons
-- ============================================================
insert into public.perfil_loja (id, nome_loja, telefone, endereco, loja_aberta)
values (1, 'A Fonte Delivery', '(11) 99999-0000', 'Rua das Flores, 123 - Centro, São Paulo - SP', true);

insert into public.horarios_funcionamento (dia, ordem, abertura, fechamento, ativo) values
  ('Segunda-feira',1,'08:00','22:00',true),
  ('Terça-feira',2,'08:00','22:00',true),
  ('Quarta-feira',3,'08:00','22:00',true),
  ('Quinta-feira',4,'08:00','22:00',true),
  ('Sexta-feira',5,'08:00','23:00',true),
  ('Sábado',6,'09:00','23:00',true),
  ('Domingo',7,'10:00','20:00',false);

insert into public.faixas_taxa (id,tipo,km_inicial,km_final,preco) values
  ('fc1','cliente',0,3,5.0),('fc2','cliente',3,6,8.0),('fc3','cliente',6,10,12.0),('fc4','cliente',10,15,18.0),
  ('fe1','entregador',0,3,4.0),('fe2','entregador',3,6,6.5),('fe3','entregador',6,10,9.0),('fe4','entregador',10,15,13.0);

-- Realtime
alter publication supabase_realtime add table public.pedidos;
alter publication supabase_realtime add table public.rotas;
alter publication supabase_realtime add table public.caixa_sessoes;
