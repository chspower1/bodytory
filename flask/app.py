import gensim
import operator
import pandas as pd
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request
from konlpy.tag import Okt
from krwordrank.word import KRWordRank
from krwordrank.word import summarize_with_keywords
from gensim.models import Word2Vec


app = Flask(__name__)
CORS(app, resources={r'/api/*': {'origins':['http://kdt-ai5-team01.elicecoding.com', 'https://kdt-ai5-team01.elicecoding.com', 'http://localhost:3000', 'https://localhost:3000']}})

okt = Okt()
stopwords = ['의', '가', '이', '은', '들', '는', '좀', '잘', '걍', '과', '도', '를', '으로', '자', '에', '와', '한', '하다', '이다', ',', '"',
             "'", ';', '.', '/', '(', ')', '[', ']', '-', '_', '=', '증상', '있다', '경우', '나타', '한다', '발생', '등의', '등이',
             '따라', '있는', '된다', '가장', '주로', '심한', '동반', '또는', '이상', '환자', '같은', '것이', '의해', '다른', '대부분', '있으며', '의한',
             '정도', '부위', '대개', '흔히', '매우', '또한', '진행', '인한', '인해', '많다', ' 않는', '보이', '이러한', '흔한', '때문에', '있고', '함께',
             '초기', '보인다', '혹은', '많이', '지속', '없는', '다양한', '보통', '원인', '특징', '특히', '대한', '여러', '하며', '그러나', '없이', '드물게',
             '이를', '서서히', '일부', '등을', '하고', '시작', '하지', '흔하', '하는', '것으로', '이는', '있을', '후에', '않고', '비교적', '되면', '가지',
             '되고', '쉽게', '사람', '일어', '일반', '등으로', '못하', '없다', '비해', '따른', '이후', '일으', '있어', '자주', '것을', '많은', '에서',
             '것은', '내에', '위치', '외에', '않은', '그리고', '더러', '간혹', '당황', '또', '또한', '더해', '더는', '더이상', '그리고', '느끼', '알려져',
             '동안', '되며', '듯한', '걸쳐', '달리', '어느', '있지만', '통해', '어려', '어지', '이런', '이로', '때는', '우연히', '아니라', '이내에', '전형적인',
             '되어', '들어', '않으면', '보일', '계속', '처음', '필요', '다르게', '않아', '때로는', '빠르게', '말한다', '어떤', '중에', '위해', '인하여', '종종',
             '문제가', '크게', '떨어', '지나', '인지', '많으며', '대표적인', '이와', '경향이', '변하', '있거나', '먼저', '높은', '이외에도', '다음', '급격히',
             '기타', '시에', '있습니다', '주어', '편이다', '단순', '전에', '자율', '증세가', '의하여', '비특이적', '아무런', '쪽으로', '과도한', '병원을', '비슷한',
             '이에', '등과', '반드시']
wordrank_extractor = KRWordRank(min_count=2, max_length=20, verbose=True)

department_codes = {
    "일반의": '0',
    "내과": '1',
    "순환기내과": '1',
    "혈액종양내과": '1',
    "소화기내과": '1',
    "감염내과": '1',
    "내분비내과": '1',
    "류마티스내과": '1',
    "신장내과": '1',
    "호흡기내과": '1',
    "알레르기내과": '1',
    "신경과": '2',
    "정신건강의학과": '3',
    "외과": '4',
    "이식혈관외과": '4',
    "정형외과": '5',
    "신경외과": '6',
    "흉부외과": '7',
    "성형외과": '8',
    "마취통증의학과": '9',
    "산부인과": '10',
    "소아청소년과": '11',
    "안과": '12',
    "이비인후과": '13',
    "피부과": '14',
    "비뇨기과": '15',
    "영상의학과": '16',
    "방사선종양학과": '17',
    "병리과": '18',
    "진단검사의학과": '19',
    "결핵과": '20',
    "재활의학과": '21',
    "핵의학과": '22',
    "가정의학과": '23',
    "응급의학과": '24',
    "직업환경의학과": '25',
    "예방의학과": '26',
    "기타1(치과)": '27',
    "기타4(한방)": '28',
    "기타2": '31',
    "보건": '41',
    "기타3": '42',
    "보건기관치과": '43',
    "보건기관한방": '44',
    "치과": '49',
    "구강악안면외과": '50',
    "치과보철과": '51',
    "치과교정과": '52',
    "소아치과": '53',
    "치주과": '54',
    "치과보존과": '55',
    "구강내과": '56',
    "영상치의학과": '57',
    "구강병리과": '58',
    "예방치과": '59',
    "치과소계": '60',
    "통합치의학과": '61',
    "한방내과": '80',
    "한방부인과": '81',
    "한방소아과": '82',
    "한방안·이비인후·피부과": '83',
    "한방신경정신과": '84',
    "침구과": '85',
    "한방재활의학과": '86',
    "사상체질의학과": '87',
    "한방응급": '88',
    "한방소계": '90',
    "신종플루거점병원": '500'
}


def keyword_extractor(sentence_list):
    # keywords, rank, graph = wordrank_extractor.extract(sentence_list, 0.9, 100)
    keyword_stopwords = {'했다', '있었다', '오늘은'}
    keywords = summarize_with_keywords(sentence_list, min_count=1, max_length=10, beta=0.85, max_iter=10,
                                       stopwords=keyword_stopwords)
    rank = []
    for word, r in sorted(keywords.items(), key=lambda x:x[1], reverse=True)[:10]:
        rank.append(word)
    return rank


def tokenizer(sentence):
    tmp = []
    tokenized = okt.morphs(sentence, stem=True)  # 토큰화
    stopwords_removed = [
        word for word in tokenized if not word in stopwords]  # 불용어 제거
    changed = [word if word != '귀가' else '귀' for word in stopwords_removed]
    tmp.append(changed)
    return tmp


def predict_departments(sentence):
    word_list = tokenizer(sentence)
    keep = []
    result = {}
    for word in word_list[0]:
        keep.append(word)
        try:
            keep = keep + [i for i, v in w2v_model.wv.most_similar(word)[:]]
        except:
            continue
    for i in query_data.index:
        result[i] = len(set(query_data['symptom'][i][0]).intersection(set(keep)))
    department_list = list(dict(sorted(result.items(), key=operator.itemgetter(1), reverse=True)).keys())
    depart_code_list = list(map(lambda x: department_codes[x], department_list))
    depart_code_list.remove('500')
    depart_code_list = depart_code_list[:3]
    return ','.join(depart_code_list)


@app.route('/api/departments', methods=['POST'])
def predict():
    body = request.get_json()
    data = {'departments_result': predict_departments(body['sentence'])}
    return jsonify(data)


@app.route('/api/keywords', methods=['POST'])
def send_keywords():
    body = request.get_json()
    data = {'keywords_result': keyword_extractor(body['sentences'])}
    return jsonify(data)


if __name__ == '__main__':
    loaded_data = pd.read_csv('./w2v_query_data_final.csv')
    query_data = loaded_data.set_index('department_single')
    query_data['symptom'] = query_data['symptom'].apply(lambda x: tokenizer(x))
    w2v_model = gensim.models.Word2Vec.load('./kor_w2v_final')

    print('test')
    app.run(host='0.0.0.0', port=8080)
