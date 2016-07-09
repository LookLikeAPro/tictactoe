from django.db import models
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

class Game(models.Model):
	player1 = models.CharField(max_length=255)
	player2 = models.CharField(max_length=255)

class Move(models.Model):
	game = models.ForeignKey("Game")
	position = models.IntegerField()
	player = models.IntegerField()

class GameSerializer(serializers.ModelSerializer):
	player1 = serializers.CharField(allow_blank=True)
	player2 = serializers.CharField(allow_blank=True)
	moves = serializers.SerializerMethodField()
	def get_moves(self, obj):
		return obj.move_set.all().count()
	board_state = serializers.SerializerMethodField()
	def get_board_state(self, obj):
		moves = obj.move_set.all()
		board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
		for move in moves:
			board[move.position] = move.player
		return board
	class Meta:
		model = Game

class MoveSerializer(serializers.ModelSerializer):
	game = serializers.PrimaryKeyRelatedField(queryset=Game.objects.all())
	position = serializers.IntegerField()
	player = serializers.IntegerField()
	class Meta:
		model = Move
		validators = [UniqueTogetherValidator(
			queryset=Move.objects.all(),
			fields=('game', 'position')
		)]
