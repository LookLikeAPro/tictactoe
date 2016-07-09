from rest_framework.response import Response
from app.models import Game, GameSerializer
from app.models import Move, MoveSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView

class GameList(ListCreateAPIView):
	def get_queryset(self):
		return Game.objects.all()
	serializer_class = GameSerializer

class GameDetail(RetrieveUpdateDestroyAPIView):
	lookup_field = "id"
	queryset = Game.objects.all()
	serializer_class = GameSerializer

class MoveList(ListCreateAPIView):
	def get_queryset(self):
		return Move.objects.all()
	serializer_class = MoveSerializer
	def perform_create(self, serializer):
		moves = serializer.validated_data['game'].move_set.all().count()
		if not serializer.validated_data['player'] in [1, 2]:
			raise ValidationError('Invalid player')
		if moves%2 == 0 and serializer.validated_data['player'] != 1:
			raise ValidationError('This player cannot move right now')
		if moves%2 == 1 and serializer.validated_data['player'] != 2:
			raise ValidationError('This player cannot move right now')
		if serializer.validated_data['position'] < 0 or serializer.validated_data['position'] > 8:
			raise ValidationError('Position is invalid')

		serializer.is_valid(raise_exception=True)
		serializer.save()

class MoveDetail(RetrieveUpdateDestroyAPIView):
	lookup_field = "id"
	queryset = Move.objects.all()
	serializer_class = MoveSerializer
